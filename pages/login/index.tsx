import { AuthPage } from "@refinedev/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function Login() {
  return (
    <AuthPage
      type="login"
      title=""
      formProps={{
        initialValues: {
          email: "",
          password: "",
        },
      }}
    />
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: redirectTo ?? "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
