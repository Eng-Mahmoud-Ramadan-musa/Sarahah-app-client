import React from 'react';
import FormSendMessage from '../components/formSendMessage/FormSendMessage';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Helmet } from "react-helmet";

export default function SendMessage() {
  return (
    <>
      <Helmet>
        <title>Send Message</title>
        <meta name="description" content="Send an anonymous message to any user in Sarahah app easily and privately." />
        <meta property="og:title" content="Send Message | Sarahah" />
        <meta property="og:description" content="Send an anonymous message to any user in Sarahah app easily and privately." />
      </Helmet>
      <div className="flex flex-col justify-center items-center h-full">
        <Header />
        <FormSendMessage />
        <Footer />
      </div>
    </>
  )
}
