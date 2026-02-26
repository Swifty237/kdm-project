// hooks/useFormValidation.ts
import { useState } from 'react';

interface ValidationRules {
    required?: boolean;
    condition?: boolean;
    message?: string;
}

export const useFormValidation = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (fieldName: string, value: unknown, rules: ValidationRules = {}) => {
        if (rules.required && (!value || value === '')) {
            return rules.message || 'Ce champ est requis';
        }
        if (rules.condition && !rules.condition) {
            return rules.message || 'Condition non remplie';
        }
        return '';
    };

    const setFieldTouched = (fieldName: string) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
    };

    const setFieldError = (fieldName: string, error: string) => {
        setErrors(prev => ({ ...prev, [fieldName]: error }));
    };

    const clearFieldError = (fieldName: string) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    return {
        errors,
        touched,
        setFieldTouched,
        setFieldError,
        clearFieldError,
        validateField
    };
};