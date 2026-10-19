type SubjectProps = {
  subjectName: string;
  lessonType?: string;
  description: string;
  credits: number;
  semester?: number | string;
  teacher?: string;
  classroom?: string;
  building?: string;
};

export default function Subject({
  subjectName,
  lessonType,
  description,
  credits,
  semester,
  teacher,
  classroom,
  building,
}: SubjectProps) {
  return (
    <article className="subject">
      <h3>{subjectName}</h3>
      {lessonType && <p><strong>Тип заняття:</strong> {lessonType}</p>}
      <p>{description}</p>
      <p>Кредити ЄКТС: {credits}</p>
      {semester !== undefined && <p>Семестр: {semester}</p>}
      <p><strong>Викладач:</strong> {teacher ?? 'Уточнюється'}</p>
      {classroom && (
        <p>
          <strong>Аудиторія:</strong> {classroom}
          {building ? ` (${building})` : ''}
        </p>
      )}
    </article>
  );
}
