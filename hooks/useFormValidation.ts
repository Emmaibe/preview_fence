import { useState, useEffect } from "react";

type ValidationRules = {
    [field: string]: (value: string) => boolean;
};

type FormState = {
    [field: string]: string;
};

type ValidityState = {
    [field: string]: boolean;
};

const useFormValidation = (
    initialFormState: FormState,
    validationRules: ValidationRules
) => {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [validityState, setValidityState] = useState<ValidityState>(
        Object.keys(initialFormState).reduce((acc, key) => {
            acc[key] = false; // Initialize all fields as invalid
            return acc;
        }, {} as ValidityState)
    );
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormState((prev) => ({ ...prev, [field]: value }));

        // Validate the field and update its validity state
        if (validationRules[field]) {
            const isValid = validationRules[field](value);
            setValidityState((prev) => ({ ...prev, [field]: isValid }));
        }
    };

    useEffect(() => {
        // Check overall form validity
        const allValid = Object.values(validityState).every((isValid) => isValid);
        setIsFormValid(allValid);
    }, [validityState]);

    return {
        formState,
        validityState,
        isFormValid,
        handleChange,
    };
};

export default useFormValidation;
