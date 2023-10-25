import * as React from "react";
import {Form, OutlinedTextBox, OutlinedTextArea, Headline, Body, Image, FilledCard, Subheading} from "../arroz-con-webo";

const AboutPage = () => {
  return (
    <main>
      <Headline>About</Headline>
      <div>
        <div>
          <Image />
          <Body></Body>
        </div>
        <FilledCard>
          <Subheading>Contact Us</Subheading>
          <Form>
            <OutlinedTextBox>example@email.com</OutlinedTextBox>
            <OutlinedTextBox>Jose Tamal</OutlinedTextBox>
            <OutlinedTextArea />
          </Form>
        </FilledCard>
      </div>
    </main>
  );
}

export default AboutPage;

export const Head = () => <title>About Us</title>;
