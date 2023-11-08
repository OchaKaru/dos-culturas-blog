import * as React from "react";
import {Form, OutlinedTextBox, OutlinedTextArea, Headline, Body, Image, FilledCard, Subheading, FilledButton} from "../arroz-con-webo";

import image from '../images/tamales_broll.png';
import '../styles/about/about-page.scss';

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-bio">
        <Headline>About</Headline>
        <Image className="about-image" source={image} />
        <Body>
          Welcome to 'Dos Culturas,' a culinary journey into the heart of authentic and delicious
          recipes from Mexico and Puerto Rico. Our website is a vibrant tapestry of diverse and time-honored cuisines,
          celebrating the rich cultural heritage of each dish.<br />
          Explore a treasure trove of recipes that have been passed down through generations, offering a taste of
          the traditions and flavors that define the different cultures. From mouthwatering Mexican Chiles Rellenos to
          the soul-warming Puerto Rican Pernil, our collection is a culinary passport to this culinary heritage.<br />
          Each recipe is carefully crafted to capture the essence of its origin, from the selection of ingredients to
          the cooking methods, so you can recreate these authentic dishes in your own kitchen. Dive into the stories
          behind these recipes, understanding the culture, history, and significance of each dish.<br />
          Whether you're an aspiring chef, a home cook, or simply an enthusiast of hispanic cuisine, 'Dos Culturas'
          is your gateway to savor the world's most cherished culinary treasures. Join us on a journey of taste and tradition,
          one recipe at a time. Buen provecho!<br />
        </Body>
      </div>
      <FilledCard className="contact-us" role="secondary">
        <Subheading>Contact Us</Subheading>
        <Form>
          <OutlinedTextBox label="Your email" rounded>example@email.com</OutlinedTextBox>
          <OutlinedTextBox label="Your name" rounded>Jose Tamal</OutlinedTextBox>
          <FilledButton role="primary" pill type="submit">Send!</FilledButton>
        </Form>
      </FilledCard>
    </main>
  );
}

export const Head = () => <title>About Us</title>;
