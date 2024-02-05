import { joinClasses } from '@helpers/join-classes';
import { FC } from 'react';
import { TLevel } from './level';
import toast, { Toast, CheckmarkIcon } from 'react-hot-toast';
import { Transition } from '@headlessui/react';
import { IoCloseCircle } from 'react-icons/io5';

type NotificationProps = {
    id: string;
    message: string;
    level: TLevel;
    t?: Toast;
};

export const Notification: FC<NotificationProps> = ({ id, message, level }) => {
    const styles = {
        defaults: {
            container: 'rounded w-96 py-4 px-6 border-b-4 flex-row'
        },

        basic: {
            container: 'bg-gray-600/70 border-gray-900'
        },
        red: {
            container: 'bg-red-900/70 border-red-900'
        },
        green: {
            container: 'bg-green-900/70 border-green-900'
        }
    };

    const remove = () => {
        toast.remove(id);
    };

    return (
        <Transition
            show={true}
            appear
            className=""
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
        >
            <div
                onClick={remove}
                className={joinClasses(styles.defaults.container, styles[level].container)}
            >
                {level === 'green' && <CheckmarkIcon />}
                {level === 'red' && (
                    <div className="text-2xl">
                        <IoCloseCircle />
                    </div>
                )}
                <span className="ml-4 font-bold">{message}</span>
            </div>
        </Transition>
    );
};
