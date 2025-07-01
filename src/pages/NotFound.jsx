import { Helmet } from "react-helmet";

export default function NotFound({ content = 'page' }) {
    return (
      <>
        <Helmet>
          <title>الصفحة غير موجودة | سراحه</title>
          <meta name="description" content="الصفحة التي تبحث عنها غير موجودة في تطبيق سراحه." />
          <meta property="og:title" content="الصفحة غير موجودة | سراحه" />
          <meta property="og:description" content="الصفحة التي تبحث عنها غير موجودة في تطبيق سراحه." />
        </Helmet>
        <div className="w-full text-white h-full font-bold text-3xl flex justify-center items-center">
          {
            content 
            ? <h1>{content} Not Found</h1>
            : <h1>Page Not Found</h1>
          }
        </div>
      </>
    );
  }
  