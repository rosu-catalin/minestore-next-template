export default function Error() {
    return (
        <div className="flex-col rounded-[10px] bg-[#18181d] p-6">
            <span className="text-center text-[28px] text-accent">OOOPPSS!</span>

            <span className="text-center">Something went wrong or our servers are offline!</span>

            <span className="mt-8 text-xl">You{"'"}re the best, but something happened 🥺</span>

            <hr className="mt-2 border-[2.5px] border-accent" />

            <p className="mt-8 text-gray-400">
                <span className="font-bold text-white">
                    Please, contact us at Discord or any other way!
                </span>
                <p>Probably our servers are offline or something happened with your payment.</p>
            </p>

            <p className="mt-8 text-gray-400">
                <span className="font-bold text-white">
                    Please contact us with your username and attached proof of purchase.
                </span>
                <p>
                    Maybe your payment marked as {'"'}pending{'"'}. Also make sure that you have
                    submitted your correct Minecraft username. If this is not the case, please
                    mention this.
                </p>
            </p>
        </div>
    );
}
