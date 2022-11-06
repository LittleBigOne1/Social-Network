import * as yup from 'yup';

export const userSchema = yup.object().shape({
   firstName: yup
      .string()
      .required('ce champ est obligatoire')
      .max(30, 'maximum 30 caractères !'),
   lastName: yup
      .string()
      .required('ce champ est obligatoire')
      .max(30, 'maximum 30 caractères !'),
   email: yup
      .string()
      .email('email invalide')
      .required("l'email est obligatoire"),
   password: yup
      .string()
      .required('Mot de passe est obligatoire')
      .matches(/([0-9])/, 'Doit contenir au moins un chiffre')
      .matches(/([A-Z])/, 'Doit contenir au moins une majuscule')
      .matches(/([a-z])/, 'Doit contenir au moins une minuscule')
      .min(8, 'Mot de passe doit faire au moins 8 caractères')
      .max(50, 'Mot de passe ne doit pas dépasser 50 caractères'),
   confirmPassword: yup
      .string()
      .oneOf(
         [yup.ref('password'), null],
         'Les mots de passe ne correspondent pas'
      ),
});
