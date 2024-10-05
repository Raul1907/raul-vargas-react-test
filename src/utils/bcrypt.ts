import bcrypt from 'bcryptjs'; // bcryptjs para la contraseña

const saltRounds = 10; // Nivel de complejidad del hash
// Función para hashear la contraseña
export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, saltRounds);
  };
  
  // Función para comparar contraseñas
 export const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword);
  };