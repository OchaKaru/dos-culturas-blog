import * as React from "react";
import {Form, OutlinedTextBox, OutlinedTextArea, Headline, Body, Image, FilledCard, Subheading, FilledButton} from "../arroz-con-webo";

export default function AboutPage() {
  return (
    <main>
      <Headline>About</Headline>
      <div>
        <div>
          <Image />
          <Body></Body>
        </div>
        <FilledCard role="secondary">
          <Subheading>Contact Us</Subheading>
          <Form>
            <OutlinedTextBox label="Your email" rounded>example@email.com</OutlinedTextBox>
            <OutlinedTextBox label="Your name" rounded>Jose Tamal</OutlinedTextBox>
            <FilledButton role="primary" pill type="submit">Send!</FilledButton>
          </Form>
        </FilledCard>
      </div>
    </main>
  );
}

export const Head = () => <title>About Us</title>;
