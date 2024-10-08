export const placeHolderHandler = (inputFor: InputForOptions) => {
  switch (inputFor) {
    case "email":
      return "Email";
    case "emailOrUsername":
      return "Email or username";
    case "password":
      return "Password";
    case "userName":
      return "Username";
    case "verification":
      return "Verification code";
    default:
      break;
  }
};
