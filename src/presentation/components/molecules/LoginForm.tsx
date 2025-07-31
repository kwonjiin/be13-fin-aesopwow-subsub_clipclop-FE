import React, { useState } from "react";
import { InputTextBox } from "../atoms/InputTextBox";
import { CustomButton } from "../atoms/CustomButton";
import { CheckBox } from "../atoms/CheckBox";
import { useLoginViewModel } from "../../../application/viewModels/LoginViewModel";

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, onClickLoginButton } = useLoginViewModel();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClickLoginButton(email, password, rememberMe);
    };
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
            <InputTextBox
                type="default"
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <InputTextBox
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <CheckBox
                label="Remember Me"
                checked={rememberMe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                />
                
            <div className="pt-4">
                <CustomButton
                    title="Sign In"
                    loading={loading}
                    type="submit"
                    color="#9c7866"
                />
            </div>
        </form>
    );
};
