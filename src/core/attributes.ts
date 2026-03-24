

export function setAttributes(element : HTMLElement , attr : Record<string,any>) {
    const { class: className, style, ...otherAttr } = attr;
    if (className) {
        setClass(element, className)
    }
    if (style) {
        Object.entries(style).forEach(([property  , value]) => {
            setStyle(element , property , value);
        });
    }
    if (otherAttr) {
        for (const [property, value] of Object.entries(otherAttr)) {
            setAttribute(element,property,value);
        }
    }

}
export function setAttribute(element : HTMLElement , property : string , value :string) {
    if (value == null) {
        element.setAttribute(property,"");
    }else{
        element.setAttribute(property, value);
    }
}
export function setStyle(element: HTMLElement, property: any, value: any) {
    element.style[property] = value;
}
export function removeAttribute(element : HTMLElement , attr : string) {
    element.removeAttribute(attr);
}
export function removeStyle(element : HTMLElement , property : any ) {
    element.style[property] = "";
}

export function setClass(element: HTMLElement, className: (string[] | string)) {
    //framework should handle both ways string or array of string as class for HTMLElement object
    element.className = "";
    if (typeof className === 'string') {
        element.className = className;
    }
    if (Array.isArray(className)) {
        element.classList.add(...className);
    }
}