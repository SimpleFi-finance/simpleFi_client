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
        jobTitle: "Blockchain Engineer (remote)",
        link: "https://drive.google.com/file/d/1Gc5MTI1eV_U4e3t2XWNypogVdHNLRqeg/view?usp=sharing",
      },
      {
        jobTitle: "Data Engineer (remote)",
        link: "https://drive.google.com/file/d/1JByob3sZVTnz8iR9-jqczFey61nAemDi/view?usp=sharing",
      },
      {
        jobTitle: "DevOps Engineer (remote)",
        link: "https://drive.google.com/file/d/1qVQnbUirPIQEBUm8YI0uB3G9g5lZ_3vB/view?usp=sharing",
      },

      {
        jobTitle: "Full Stack Developer (remote)",
        link: "https://drive.google.com/file/d/1l2xV052LFjdBwpuUmr8EMOhA6OmBv-_I/view?usp=sharing",
      },
      {
        jobTitle: "Marketing and Community Lead (remote)",
        link: "https://drive.google.com/file/d/1xwx8lEGnYB31vhoM7pW4IOLgvc9BCpHy/view?usp=sharing",
      },
      {
        jobTitle: "Product Manager (remote)",
        link: "https://drive.google.com/file/d/1sT-tmfjO6-y1eCxVohdINX5c30fyYo49/view?usp=sharing",
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
