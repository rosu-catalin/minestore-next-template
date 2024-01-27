import { Alert } from '@layout/alert/alert';
import { AuthForm } from './components/auth-from';

export default async function Auth() {
    return (
        <div className="flex-col rounded-[10px] bg-[#18181d] p-4">
            <Alert />
            <AuthForm />
        </div>
    );
}
