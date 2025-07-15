import { Helmet } from "react-helmet-async";

export default function NotFound({ content = 'page' }) {
    return (
      <>
        <Helmet>
          <title>Page Not Found | Sarahah</title>
          <meta name="description" content="The page you are looking for does not exist in Sarahah app." />
          <meta property="og:title" content="Page Not Found | Sarahah" />
          <meta property="og:description" content="The page you are looking for does not exist in Sarahah app." />
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
  