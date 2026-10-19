type SubjectProps = {
  subjectName: string;
  description: string;
  credits: number;
  teacher?: string;
  semester: number;
};

export default function Subject({
  subjectName,
  description,
  credits,
  teacher,
  semester,
}: SubjectProps) {
  return (
    <article className="subject">
      <h3>{subjectName}</h3>
      <p>{description}</p>
      <p>Кредити ЄКТС: {credits}</p>
      <p>Семестр: {semester}</p>
      <p>Викладач: {teacher ?? 'Уточнюється'}</p>
    </article>
  );
}
