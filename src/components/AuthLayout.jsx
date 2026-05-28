const AuthLayout = ({children,title,subtitle}) => {

    return(
    
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
    
    <div className="
    w-full
    max-w-md
    bg-[#1a1a1a]
    border
    border-gray-700
    rounded-3xl
    p-8
    shadow-xl
    ">
    
    <h1 className="
    text-3xl
    font-bold
    mb-2
    text-center
    ">
    
    {title}
    
    </h1>
    
    <p className="
    text-gray-400
    text-center
    mb-8
    ">
    
    {subtitle}
    
    </p>
    
    {children}
    
    </div>
    
    </div>
    
    );
    
    };
    
    export default AuthLayout;