import React from "react";
import classNames from "classnames";
import SectionHeader from "../components/sections/partials/SectionHeader";
import GenericSection from "../components/sections/GenericSection";
import SimpleSection from "../components/sections/SimpleSection";
import Tag from "../components/elements/Tag";
import { map } from "lodash";

class Careers extends React.Component {
  constructor(props) {
    super(props);
    this.accessRef = React.createRef();
  }

  render() {
    const heroClasses = classNames(
      "features-tiles section center-content",
      "has-bg-color",
      "invert-color",
      "heroSpacer-100",
      "heroHeight-480",
      "heroCustomBackdrop",
      "heroColor"
    );

    const panelClassesA = classNames("sectionsPadding");

    const heroData = {
      title: "Join SimpleFi",
      paragraph:
        "Join us in our mission to democratize DeFi investing, and create the world’s go-to platform for DeFi analytics and portfolio management.",
    };

    const panelDataA = {
      header: "About Our Team",
      content:
        "SimpleFi is an award-winning DeFi analytics platform that is VC-funded, has received grants from The Graph, NEAR and Uniswap, and our team won the HackMoney EthGlobal hackathon in 2021. We are looking for people who love DeFi, and encourage candidates of all races, creeds, genders, age, and sexual orientation to apply.",
    };

    const panelDataB = {
      header: "Open Positions",
    };

    const jobOpenings = [
      {
        jobTitle: "Blockchain engineer (remote)",
        link: "https://drive.google.com/file/d/1A_CXyDf8aLsZjSLV5UjT_7zQQ4dXtqjl/view?usp=sharing",
      },
      {
        jobTitle: "Data Engineer (remote)",
        link: "https://drive.google.com/file/d/1LEgFZtqfe6jM_EHG5JhhowiXm2F5GFKa/view?usp=sharing",
      },
      {
        jobTitle: "DevOps Engineer (remote)",
        link: "https://drive.google.com/file/d/1yZk5gV2gJZz6bNcwXjcZi4zao7JPgdGk/view?usp=sharing",
      },

      {
        jobTitle: "Full Stack Developer (remote)",
        link: "https://drive.google.com/file/d/1keRi9_amSKF22Yq8P1pPFCmNfy3DI-0J/view?usp=sharing",
      },
      {
        jobTitle: "Marketing and Community Lead (remote)",
        link: "https://drive.google.com/file/d/1US0ruJ1g5lcPKK1if8HovmDcHTv7mndN/view?usp=sharing",
      },
      {
        jobTitle: "Product Manager (remote)",
        link: "https://drive.google.com/file/d/17cfVWXAD2pr7Ioo2pgBUOjGR2i4Wn7D8/view?usp=sharing",
      },
    ];

    return (
      <React.Fragment>
        <GenericSection className={heroClasses}>
          <SectionHeader
            data={heroData}
            className="center-content"
            width={72}
            height={72}
          />
        </GenericSection>
        <SimpleSection
          header={panelDataA.header}
          content={panelDataA.content}
          className={panelClassesA}
        />
        <SimpleSection header={panelDataB.header} className={"mb-32"}>
          <div className={"tags-container"}>
            {jobOpenings.map((role) => {
              return <Tag title={role.jobTitle} link={role.link} />;
            })}
          </div>
        </SimpleSection>
      </React.Fragment>
    );
  }
}

export default Careers;
