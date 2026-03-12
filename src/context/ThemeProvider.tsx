import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react"

interface ThemeContextValue {
   isExpanded: boolean
   isLoggedIn: boolean
   setIsExpanded: Dispatch<SetStateAction<boolean>>
   setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

const ThemeProvider = ({children}: PropsWithChildren) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const contextValue: ThemeContextValue = {
        isExpanded,
        isLoggedIn,
        setIsExpanded,
        setIsLoggedIn
    }

    return (
        <ThemeContext.Provider
         value={contextValue}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, useTheme }

export default ThemeProvider