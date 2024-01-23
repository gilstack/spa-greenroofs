import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import PinList from "./list/[id]";

const PinsPage: React.FC = () => {
  return <PinList />;
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

export default PinsPage;
