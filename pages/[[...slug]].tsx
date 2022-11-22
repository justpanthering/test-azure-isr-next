import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ pageData }: { pageData: any }) {
  console.log(pageData);

  return (
    <div className={styles.container}>{JSON.stringify(pageData["2"])}</div>
  );
}

export async function getStaticPaths() {
  let paths: { params: { slug: string[] } }[] = [{ params: { slug: [""] } }];

  try {
    // const { data }: { data: { data: { attributes: { pageName: string } }[] } } =
    //   await cmsAxiosInstance.get(CMS_BASE_URL + '/api/cw-pages');
    // paths = data.data.map(({ attributes }, idx) => {
    //   return {
    //     params: {
    //       slug: [attributes.pageName !== 'home' ? attributes.pageName : ''],
    //     },
    //   };
    // });
  } catch (error) {
    //
  }

  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: {
  params: { slug: any };
  preview: any;
}) {
  const { slug } = context.params;

  let pageData = null;
  // let globalData = null;

  try {
    const res = await fetch(
      "https://dev-cms-partner.wellthee.io" +
        `/api/${"cw-" + (slug || "home")}?populate=deep,5`
    );

    const data = await res.json();

    // console.log(data.data.attributes.Blocks);

    pageData = { ...data.data.attributes.Blocks };

    // const {
    //   data: {
    //     data: {
    //       attributes: { Blocks },
    //     },
    //   },
    // } = await cmsAxiosInstance.get(
    //   CMS_BASE_URL + `/api/cw-global?populate=deep,5`
    // );
    // globalData = Blocks;

    return {
      props: {
        pageData: pageData,
        // globalData: globalData,
        preview: context.preview || null,
      },
      // revalidate: 10,
    };
  } catch (error) {
    return {
      props: { pageData: pageData },
    };
  }
}
