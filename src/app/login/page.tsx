import { Suspense } from "react";
import CompLogin from "../components/compLogin/compLogin";

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="text-center">Carregando...</div>}>
            <CompLogin />
        </Suspense>
    );
}
