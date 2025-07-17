export const NavBarButton = (props: {title: string}) => {
    return (
        <div className="p-3 text-lg border-b-2 border-[#00000000] hover:border-[#202c36] dark:hover:border-white transition-all duration-300 ease-in-out">
            {props.title}
        </div>
    );
};