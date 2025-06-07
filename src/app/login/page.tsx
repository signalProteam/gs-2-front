import { Suspense } from "react";
import CompLogin from "../components/compLogin/compLogin";

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Carregando login...</div>}>
            <CompLogin />
        </Suspense>
    );
}
