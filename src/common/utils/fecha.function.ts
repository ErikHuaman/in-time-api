const nombresDias = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

export const getDiasDelMes = (
  date: Date,
): { dia: number; diaSemana: number; nombre: string; fecha: Date }[] => {
  const fecha = new Date(date);
  fecha.setHours(0, 0, 0, 0);
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth();
  const diasDelMes: {
    dia: number;
    diaSemana: number;
    nombre: string;
    fecha: Date;
  }[] = [];

  const ultimoDia = new Date(anio, mes + 1, 0).getDate();

  for (let i = 1; i <= ultimoDia; i++) {
    const fechaActual = new Date(anio, mes, i);
    const diaSemana = fechaActual.getDay();
    const nombreDia = nombresDias[diaSemana];
    const adjustedDay = diaSemana === 0 ? 7 : diaSemana;

    diasDelMes.push({
      dia: i,
      diaSemana: adjustedDay,
      nombre: nombreDia,
      fecha: fechaActual,
    });
  }
  return diasDelMes;
};

export const getDia = (
  date: Date,
): { dia: number; diaSemana: number; nombre: string; fecha: Date } => {
  const fechaActual = new Date(date);
  fechaActual.setHours(0, 0, 0, 0);

  const diaSemana = fechaActual.getDay();
  const nombreDia = nombresDias[diaSemana];
  const adjustedDay = diaSemana === 0 ? 7 : diaSemana;

  return {
    dia: fechaActual.getDate(),
    diaSemana: adjustedDay,
    nombre: nombreDia,
    fecha: fechaActual,
  };
};
