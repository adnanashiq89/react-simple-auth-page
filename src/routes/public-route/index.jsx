import {
  SignInPage,
  SignupUserPage,
  ForgotPasswordPage,
  SignupBusinessPage,
  VerifyOtp,
  NewPassword,
  SelectUserType,
} from "../../pages";

const authenticatedRoutes = [
  {
    key: 0,
    path: "/",
    element: SignInPage,
  },

  {
    key: 1,
    path: "/select-user",
    element: SelectUserType,
  },

  {
    key: 1,
    path: "/signup-user",
    element: SignupUserPage,
  },

  {
    key: 1,
    path: "/signup-business",
    element: SignupBusinessPage,
  },

  {
    key: 1,
    path: "/forgot-password",
    element: ForgotPasswordPage,
  },

  {
    key: 1,
    path: "/verify-otp",
    element: VerifyOtp,
  },

  {
    key: 1,
    path: "/new-password",
    element: NewPassword,
  },
];

function withNavigationWatcher(Component, path) {
  const WrappedComponent = function (props) {
    return <Component {...props} />;
  };
  return <WrappedComponent />;
}
export default authenticatedRoutes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
