import { useEffect, useRef, useState } from "react";

type IntersectionObserverWrapperProps = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onChange: (visible: boolean) => void;
};

const IntersectionObserverWrapper = ({
    children,
    style,
    onChange,
}: IntersectionObserverWrapperProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const domref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry);
                setIsVisible(entry.isIntersecting);
            });
        });
        observer.observe(domref.current as any);
    }, []);

    useEffect(() => {
        onChange(isVisible);
    }, [isVisible]);

    return (
        <div ref={domref} style={style}>
            {children}
        </div>
    );
};

export default IntersectionObserverWrapper;
