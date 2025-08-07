import Image from 'next/image';
import { defineField, defineType } from 'sanity';

// se define el tipo de documento 'student'

export const studentType = defineType({
  name: 'student',
  title: 'Student',
  type: 'document',
  fields: [
    //campo para el nombre
    defineField({
      name: 'firstName',
      title: 'Nombre',
      type: 'string',
    }),
    //campo para el apelllido
    defineField({
      name: 'lastName',
      title: 'Apellido',
      type: 'string',
    }),
    //campo para el correo electronico - obligatorio
    defineField({
      name: 'email',
      title: 'Correo Electronico',
      type: 'string',
      validation: (Rule) => Rule.required().error('El correo es obligatorio y debe ser un correo valido'),
    }),
    //ID del estudiante proporcinado por clerk- obligatorio
    defineField({
      name: 'clerkId',
      title: 'ID de Clerk',
      type: 'string',
      validation: (Rule) => Rule.required().error('El ID de Clerk es obligatorio'),
    }),
    //campo para la foto de perfil del estudiante
    defineField({
      name: 'imageUrl',
      title: 'Foto de Perfil',
      type: 'url',
    }),
  ],
  // config del preview para mostrar en el documento 
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      imageUrl: 'imageUrl',
    },
    // La funcion prepare permite personalizar la forma como se muestra el documento
    prepare({ firstName, lastName, imageUrl }) {
      const capitalize = (word: string) => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      };
      return {
        title: `${capitalize(firstName)} ${capitalize(lastName)}`,

        // Se randeeriza la imagen del perfil del estudiante
        media: (
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
          />
        )
      };
    },
  },
});