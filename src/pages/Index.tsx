import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Character = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  arguments: string[];
  color: string;
};

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const characters: Character[] = [
  {
    id: 'prosecution',
    name: 'Вредное трение',
    role: 'Обвинение',
    description: 'Я разрушаю механизмы и превращаю энергию в тепло, которое никому не нужно!',
    image: 'https://cdn.poehali.dev/projects/f5509504-d864-431b-8ddf-fbda93f2b9a2/files/b404d678-2315-4c51-adba-a0783462d078.jpg',
    arguments: [
      'Изнашиваю детали машин и механизмов',
      'Превращаю полезную энергию в бесполезное тепло',
      'Требую постоянной смазки и ухода',
      'Снижаю КПД всех механизмов'
    ],
    color: 'bg-destructive'
  },
  {
    id: 'defense',
    name: 'Полезное трение',
    role: 'Защита',
    description: 'Без меня невозможно ходить, ездить или держать предметы в руках!',
    image: 'https://cdn.poehali.dev/projects/f5509504-d864-431b-8ddf-fbda93f2b9a2/files/e7da1410-e485-4a95-b93c-25b57bac9123.jpg',
    arguments: [
      'Позволяю людям ходить без скольжения',
      'Останавливаю автомобили с помощью тормозов',
      'Помогаю удерживать предметы в руках',
      'Необходимо для работы ремней и передач'
    ],
    color: 'bg-primary'
  },
  {
    id: 'bearings',
    name: 'Подшипники',
    role: 'Свидетель',
    description: 'Я помогаю снизить трение в механизмах, заменяя скольжение на качение.',
    image: 'https://cdn.poehali.dev/projects/f5509504-d864-431b-8ddf-fbda93f2b9a2/files/d522252e-043a-44f5-83b9-7141295ddf79.jpg',
    arguments: [
      'Уменьшаю трение в 10-50 раз',
      'Продлеваю срок службы механизмов',
      'Используюсь в колёсах, моторах, турбинах'
    ],
    color: 'bg-secondary'
  },
  {
    id: 'lubricant',
    name: 'Смазка',
    role: 'Свидетель',
    description: 'Я создаю тонкую плёнку между поверхностями и уменьшаю трение.',
    image: 'https://cdn.poehali.dev/projects/f5509504-d864-431b-8ddf-fbda93f2b9a2/files/d522252e-043a-44f5-83b9-7141295ddf79.jpg',
    arguments: [
      'Снижаю износ деталей',
      'Охлаждаю механизмы',
      'Защищаю от коррозии'
    ],
    color: 'bg-accent'
  },
  {
    id: 'treads',
    name: 'Протектор шин',
    role: 'Свидетель',
    description: 'Я увеличиваю трение между колесом и дорогой для безопасности.',
    image: 'https://cdn.poehali.dev/projects/f5509504-d864-431b-8ddf-fbda93f2b9a2/files/d522252e-043a-44f5-83b9-7141295ddf79.jpg',
    arguments: [
      'Предотвращаю скольжение автомобиля',
      'Обеспечиваю управляемость на поворотах',
      'Сокращаю тормозной путь'
    ],
    color: 'bg-muted'
  }
];

const questions: Question[] = [
  {
    id: 1,
    text: 'Что произойдёт, если полностью устранить трение между подошвой обуви и полом?',
    options: [
      'Ходить станет легче и приятнее',
      'Человек не сможет ходить - ноги будут скользить',
      'Обувь прослужит дольше',
      'Ничего не изменится'
    ],
    correctAnswer: 1,
    explanation: 'Без трения между обувью и полом мы не смогли бы ходить - наши ноги скользили бы, как на льду.'
  },
  {
    id: 2,
    text: 'Для чего в механизмах используют подшипники?',
    options: [
      'Для увеличения трения',
      'Для уменьшения трения путём замены скольжения на качение',
      'Для украшения механизма',
      'Для увеличения веса конструкции'
    ],
    correctAnswer: 1,
    explanation: 'Подшипники заменяют трение скольжения на трение качения, которое в десятки раз меньше.'
  },
  {
    id: 3,
    text: 'Почему автомобильные тормоза работают благодаря трению?',
    options: [
      'Трение тормозных колодок о диск преобразует энергию движения в тепло',
      'Трение помогает автомобилю ехать быстрее',
      'Тормоза работают без трения',
      'Трение охлаждает колёса'
    ],
    correctAnswer: 0,
    explanation: 'Тормоза используют силу трения для преобразования кинетической энергии автомобиля в тепловую, что замедляет движение.'
  },
  {
    id: 4,
    text: 'Какую роль играет смазка в механизмах?',
    options: [
      'Увеличивает трение между деталями',
      'Только очищает детали от грязи',
      'Уменьшает трение, износ и охлаждает механизм',
      'Делает механизм тяжелее'
    ],
    correctAnswer: 2,
    explanation: 'Смазка создаёт тонкую плёнку между деталями, снижая трение, износ и нагрев механизма.'
  },
  {
    id: 5,
    text: 'Почему протектор на шинах увеличивает трение с дорогой?',
    options: [
      'Протектор делает шину красивее',
      'Рельеф протектора увеличивает площадь контакта и сцепление с дорогой',
      'Протектор уменьшает трение',
      'Протектор нужен только для отвода воды'
    ],
    correctAnswer: 1,
    explanation: 'Рельефный протектор увеличивает площадь контакта и улучшает сцепление с дорожным покрытием, особенно на мокрой или скользкой дороге.'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<'home' | 'characters' | 'court'>('home');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [courtStarted, setCourtStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetCourt = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCourtStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Icon name="Scale" size={28} />
              Суд над Силой трения
            </h1>
            <div className="flex gap-2">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button
                variant={activeSection === 'characters' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('characters')}
                className="gap-2"
              >
                <Icon name="Users" size={18} />
                Персонажи
              </Button>
              <Button
                variant={activeSection === 'court' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('court')}
                className="gap-2"
              >
                <Icon name="Gavel" size={18} />
                Суд
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-5xl font-bold text-primary mb-4">
                Добро пожаловать в судебное заседание!
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Сегодня мы рассмотрим необычное дело: <span className="font-semibold text-foreground">«Суд над Силой трения»</span>
              </p>
              <p className="text-lg text-muted-foreground">
                Сила трения обвиняется в том, что она мешает движению, изнашивает детали механизмов и превращает полезную энергию в тепло. Но так ли всё однозначно?
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover:shadow-lg transition-all hover:scale-105 border-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="AlertCircle" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">Обвинение</CardTitle>
                  <CardDescription>
                    Вредное трение разрушает механизмы и теряет энергию
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all hover:scale-105 border-secondary/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <Icon name="Shield" size={24} className="text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Защита</CardTitle>
                  <CardDescription>
                    Полезное трение делает возможным движение и жизнь
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-all hover:scale-105 border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon name="Eye" size={24} className="text-accent" />
                  </div>
                  <CardTitle className="text-xl">Свидетели</CardTitle>
                  <CardDescription>
                    Подшипники, смазка и протекторы расскажут свою правду
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => setActiveSection('characters')}
                className="text-lg px-8 py-6 gap-2"
              >
                Познакомиться с персонажами
                <Icon name="ArrowRight" size={20} />
              </Button>
            </div>
          </div>
        )}

        {activeSection === 'characters' && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-primary mb-4">Действующие лица</h2>
              <p className="text-lg text-muted-foreground">
                Нажмите на карточку персонажа, чтобы узнать подробности
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <Card
                  key={character.id}
                  className="cursor-pointer hover:shadow-xl transition-all hover:scale-105 overflow-hidden"
                  onClick={() => setSelectedCharacter(character)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={character.color}>{character.role}</Badge>
                    </div>
                    <CardTitle className="text-2xl">{character.name}</CardTitle>
                    <CardDescription className="text-base">
                      {character.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {selectedCharacter && (
              <Card className="animate-scale-in border-2 border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className={selectedCharacter.color + ' mb-2'}>
                        {selectedCharacter.role}
                      </Badge>
                      <CardTitle className="text-3xl">{selectedCharacter.name}</CardTitle>
                    </div>
                    <Button variant="ghost" onClick={() => setSelectedCharacter(null)}>
                      <Icon name="X" size={24} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg italic text-muted-foreground">
                    "{selectedCharacter.description}"
                  </p>
                  <div>
                    <h4 className="font-bold text-lg mb-3">Аргументы:</h4>
                    <ul className="space-y-2">
                      {selectedCharacter.arguments.map((arg, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{arg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center mt-8">
              <Button
                size="lg"
                onClick={() => setActiveSection('court')}
                className="text-lg px-8 py-6 gap-2"
              >
                Перейти к судебному заседанию
                <Icon name="Gavel" size={20} />
              </Button>
            </div>
          </div>
        )}

        {activeSection === 'court' && (
          <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
            {!courtStarted ? (
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-4xl mb-4">Судебное заседание</CardTitle>
                  <CardDescription className="text-lg">
                    Вам предстоит ответить на {questions.length} вопросов о силе трения.
                    За каждый правильный ответ вы получите балл.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    size="lg"
                    onClick={() => setCourtStarted(true)}
                    className="text-lg px-8 py-6"
                  >
                    Начать заседание
                  </Button>
                </CardContent>
              </Card>
            ) : currentQuestion < questions.length ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </Badge>
                  <Badge className="text-lg px-4 py-2 bg-primary">
                    <Icon name="Award" size={18} className="mr-2" />
                    Счёт: {score}
                  </Badge>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl leading-relaxed">
                      {questions[currentQuestion].text}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          selectedAnswer === null
                            ? 'outline'
                            : selectedAnswer === index
                            ? index === questions[currentQuestion].correctAnswer
                              ? 'default'
                              : 'destructive'
                            : index === questions[currentQuestion].correctAnswer
                            ? 'default'
                            : 'outline'
                        }
                        className="w-full text-left justify-start h-auto py-4 px-6 text-base"
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                      >
                        <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}

                    {showExplanation && (
                      <Card className="animate-scale-in bg-muted/50 border-2 border-primary mt-6">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <Icon
                              name={selectedAnswer === questions[currentQuestion].correctAnswer ? 'CheckCircle2' : 'XCircle'}
                              size={24}
                              className={selectedAnswer === questions[currentQuestion].correctAnswer ? 'text-primary' : 'text-destructive'}
                            />
                            <div>
                              <h4 className="font-bold mb-2">
                                {selectedAnswer === questions[currentQuestion].correctAnswer
                                  ? 'Правильно!'
                                  : 'Неправильно'}
                              </h4>
                              <p className="text-muted-foreground">
                                {questions[currentQuestion].explanation}
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={handleNextQuestion}
                            className="w-full mt-4"
                            size="lg"
                          >
                            {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
                            <Icon name="ArrowRight" size={18} className="ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={score >= 4 
                      ? 'https://cdn.poehali.dev/projects/f5509504-d864-431b-8ddf-fbda93f2b9a2/files/7b6aab59-bfca-481f-a813-9b9dfc61a3ed.jpg'
                      : 'https://cdn.poehali.dev/projects/f5509504-d864-431b-8ddf-fbda93f2b9a2/files/a3b9d0db-09cd-418f-b0a0-070bc31716a0.jpg'
                    }
                    alt="Результат суда"
                    className="w-full h-64 md:h-96 object-cover animate-scale-in"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                      {score >= 4 ? '⚖️ Победа!' : '⚖️ Поражение'}
                    </h3>
                    <p className="text-lg md:text-xl opacity-90">
                      {score >= 4 
                        ? 'Суд выносит решение в пользу Силы трения!'
                        : 'Защите не удалось доказать важность трения'
                      }
                    </p>
                  </div>
                </div>

                <Card className="text-center animate-scale-in">
                  <CardHeader>
                    <div className={`w-20 h-20 rounded-full ${score >= 4 ? 'bg-primary/10' : 'bg-destructive/10'} flex items-center justify-center mx-auto mb-4`}>
                      <Icon name={score >= 4 ? 'Trophy' : 'Scale'} size={40} className={score >= 4 ? 'text-primary' : 'text-destructive'} />
                    </div>
                    <CardTitle className="text-4xl mb-4">Заседание завершено!</CardTitle>
                    <CardDescription className="text-xl">
                      Ваш результат: <span className={`font-bold text-2xl ${score >= 4 ? 'text-primary' : 'text-destructive'}`}>{score}</span> из {questions.length}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`${score >= 4 ? 'bg-primary/10 border-primary/20' : 'bg-destructive/10 border-destructive/20'} border-2 rounded-lg p-6`}>
                      <h3 className="font-bold text-xl mb-3">Вердикт суда:</h3>
                      {score >= 4 ? (
                        <p className="text-lg leading-relaxed">
                          Сила трения признаётся <span className="font-bold text-primary">необходимой</span> для существования жизни и работы механизмов. 
                          Хотя она и создаёт проблемы в виде износа и потерь энергии, без неё невозможно движение, 
                          торможение и удержание предметов. Задача человека — не устранить трение, 
                          а <span className="font-bold">научиться управлять им</span> там, где это нужно!
                        </p>
                      ) : (
                        <p className="text-lg leading-relaxed">
                          К сожалению, доказательств оказалось недостаточно. Рекомендуем изучить материал глубже 
                          и вернуться к вопросам о трении. Помните: <span className="font-bold">без трения мы не смогли бы даже ходить</span>, 
                          держать предметы в руках или останавливать автомобили. Это одна из самых важных сил в природе!
                        </p>
                      )}
                    </div>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <Button onClick={resetCourt} size="lg" variant="outline">
                        <Icon name="RotateCcw" size={18} className="mr-2" />
                        Пройти снова
                      </Button>
                      <Button onClick={() => setActiveSection('home')} size="lg">
                        <Icon name="Home" size={18} className="mr-2" />
                        На главную
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Scale" size={18} />
            Образовательная ролевая игра по физике
          </p>
        </div>
      </footer>
    </div>
  );
}