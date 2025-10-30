import { DivProps } from "@/types/ui"

const Box:React.FC<DivProps> = ({as:Tag = "div", children,className}) => {
    return(
        <Tag className={className}>
            {children}
        </Tag>
    )
}

export default Box