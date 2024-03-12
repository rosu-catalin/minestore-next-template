import { AuthForm } from './components/auth-from';
import { InGameAuthForm } from './components/in-game-auth-form';

export default async function Auth() {
    return (
        <div className="flex-col rounded-[10px] bg-card p-4">
            {/* <InGameAuthForm /> */}
            <AuthForm />
        </div>
    );
}
