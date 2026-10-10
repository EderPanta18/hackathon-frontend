import { LoginForm, type LoginFormProps } from "./form";

export type LoginProps = LoginFormProps;

export function Login(props: LoginProps) {
    return <LoginForm {...props} />;
}

export default Login;
