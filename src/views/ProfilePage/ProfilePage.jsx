import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
const qs = require('query-string');

class ProfilePage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    /*const client = new ApolloClient({
      uri: "https://backend-stg.medspacemarketing.com/graphql"
    });*/
    console.log(qs.parse(this.props.location.search.id))
    ProfilePage.fragments = {
      all: gql`
        fragment Professional on ProfessionalGenericType {
            id
            isActive
            resume
            primaryImage {
              file
            }
            licenses {
                branch {
                    name
                }
                identifier
                degree
                profession
                issuer
                isVerified
            }
            places {
                id
                isActive
                location {
                    id
                    name
                    address
                    pointLatitude
                    pointLongitude
                }
                office
                phoneNumber
                services {
                    id
                    name
                    isActive
                    duration
                    schedules {
                        id
                        monday
                        tuesday
                        wednesday
                        thursday
                        friday
                        saturday
                        sunday
                        startTime
                        endTime
                        startDate
                        endDate
                    }
                    availability: availableAppointmentSlots(count: 5)
                }
            }
            user {
                id
                email
                person {
                    id
                    title
                    fullName
                    lastName
                    lastName2
                    name
                    gender
                    primaryImage {
                        file
                    }
                }
                professional {
                    primaryImage {
                        file
                    }
                    id
                }
            }
            patientProfiles {
                patientLiked
            }
        }
      `,
    };

    const GET_PROFESSIONALS = gql`
      query GetProfessional($id: ID!) {
        professionalRetrieve(id: $id) {
          ...Professional
        }
      }
      ${ProfilePage.fragments.all}
    `;
    const VARS = qs.parse(this.props.location.search)

    /*client
      .query({
        query: GET_PROFESSIONALS,
        variables: VARS
      })
      .then(result => console.log(result));*/
    return (
      <Query query={GET_PROFESSIONALS} variables={VARS} fetchPolicy="cache-and-network">
          {({ loading, data, fetchMore }) => {
            if (loading) return null;
            console.log(data.professionalRetrieve)
            console.log(data.professionalRetrieve.user.person)
            var professional = data.professionalRetrieve
            return(
              <div>
              <Header
                color="transparent"
                brand="Material Kit React"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                  height: 200,
                  color: "white"
                }}
                {...rest}
              />

              <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
              <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                  <div className={classes.container}>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6}>
                        <div className={classes.profile}>
                          <div>

                            
                            <img src={
                              
                              "https://backend-stg.medspacemarketing.com/" 
                              + 
                              (professional 
                              && professional.primaryImage
                              && professional.primaryImage.file
                              || profile)
                            } alt="..." className={imageClasses} />
                          </div>
                          <div className={classes.name}>
                            <h3 className={classes.title}>{professional.user.person.fullName}</h3>
                            <h6>{
                              professional 
                              && professional.licenses[0] 
                              && professional.licenses[0].branch
                              && professional.licenses[0].branch.name}</h6>
                            <Button justIcon link className={classes.margin5}>
                              <i className={"fab fa-twitter"} />
                            </Button>
                            <Button justIcon link className={classes.margin5}>
                              <i className={"fab fa-instagram"} />
                            </Button>
                            <Button justIcon link className={classes.margin5}>
                              <i className={"fab fa-facebook"} />
                            </Button>
                          </div>
                        </div>
                      </GridItem>
                    </GridContainer>
                    <div className={classes.description}>
                      <p>
                        An artist of considerable range, Chet Faker — the name taken
                        by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                        performs and records all of his own music, giving it a warm,
                        intimate feel with a solid groove structure.{" "}
                      </p>
                    </div>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                        <NavPills
                          alignCenter
                          color="primary"
                          tabs={[
                            {
                              tabButton: "Studio",
                              tabIcon: Camera,
                              tabContent: (
                                <GridContainer justify="center">
                                  <GridItem xs={12} sm={12} md={4}>
                                    <img
                                      alt="..."
                                      src={studio1}
                                      className={navImageClasses}
                                    />
                                    <img
                                      alt="..."
                                      src={studio2}
                                      className={navImageClasses}
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={4}>
                                    <img
                                      alt="..."
                                      src={studio5}
                                      className={navImageClasses}
                                    />
                                    <img
                                      alt="..."
                                      src={studio4}
                                      className={navImageClasses}
                                    />
                                  </GridItem>
                                </GridContainer>
                              )
                            },
                            {
                              tabButton: "Work",
                              tabIcon: Palette,
                              tabContent: (
                                <GridContainer justify="center">
                                  <GridItem xs={12} sm={12} md={4}>
                                    <img
                                      alt="..."
                                      src={work1}
                                      className={navImageClasses}
                                    />
                                    <img
                                      alt="..."
                                      src={work2}
                                      className={navImageClasses}
                                    />
                                    <img
                                      alt="..."
                                      src={work3}
                                      className={navImageClasses}
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={4}>
                                    <img
                                      alt="..."
                                      src={work4}
                                      className={navImageClasses}
                                    />
                                    <img
                                      alt="..."
                                      src={work5}
                                      className={navImageClasses}
                                    />
                                  </GridItem>
                                </GridContainer>
                              )
                            },
                            {
                              tabButton: "Favorite",
                              tabIcon: Favorite,
                              tabContent: (
                                <GridContainer justify="center">
                                  <GridItem xs={12} sm={12} md={4}>
                                    <img
                                      alt="..."
                                      src={work4}
                                      className={navImageClasses}
                                    />
                                    <img
                                      alt="..."
                                      src={studio3}
                                      className={navImageClasses}
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={4}>
                                    <img
                                      alt="..."
                                      src={work2}
                                      className={navImageClasses}
                                    />
                                    <img
                                      alt="..."
                                      src={work1}
                                      className={navImageClasses}
                                    />
                                    <img
                                      alt="..."
                                      src={studio1}
                                      className={navImageClasses}
                                    />
                                  </GridItem>
                                </GridContainer>
                              )
                            }
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
            );
          }}
      </Query>
    );
  }
}

export default withStyles(profilePageStyle)(ProfilePage);
