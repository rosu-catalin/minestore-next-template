import { AuthForm } from './components/auth-from';

export default async function Auth() {
    return (
        <div className="bg-card flex-col rounded-[10px] p-4">
            <AuthForm />
        </div>
    );
}
