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
        <meta name="description" content="أرسل رسالة مجهولة لأي مستخدم في تطبيق سراحه بسهولة وسرية." />
        <meta property="og:title" content="إرسال رسالة | سراحه" />
        <meta property="og:description" content="أرسل رسالة مجهولة لأي مستخدم في تطبيق سراحه بسهولة وسرية." />
      </Helmet>
      <div className="flex flex-col justify-center items-center h-full">
        <Header />
        <FormSendMessage />
        <Footer />
      </div>
    </>
  )
}
