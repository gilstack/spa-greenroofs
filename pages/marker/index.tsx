import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import MarkerList from "./list/index";

const MarkersPage: React.FC = () => {
  return <MarkerList />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/login")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default MarkersPage;
