import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const ConnectionGuide = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: 'Выберите подходящий адаптер',
      description: 'Для 24V системы КамАЗа подойдут специальные адаптеры для грузовых автомобилей',
      image: 'https://cdn.poehali.dev/projects/ac315fd9-9a05-4078-a06c-a765aa011547/files/d3deaa6b-5f49-421f-a746-b32b90b383ea.jpg',
      details: [
        'ELM327 24V версия (Bluetooth/WiFi)',
        'Actia Multidiag 24V',
        'Launch X431 (поддерживает грузовики)',
        'Важно: обычные 12V адаптеры НЕ подойдут!'
      ]
    },
    {
      number: 2,
      title: 'Найдите диагностический разъем',
      description: 'Разъем обычно находится рядом с блоком управления отопителем в кабине',
      image: 'https://cdn.poehali.dev/projects/ac315fd9-9a05-4078-a06c-a765aa011547/files/d7028471-15d9-4095-9a8d-40263b3d3676.jpg',
      details: [
        'Проверьте область под панелью приборов',
        'Возможно расположение в районе водительского сиденья',
        'На некоторых моделях - в моторном отсеке возле отопителя',
        'Разъем обычно подписан или имеет характерную форму'
      ]
    },
    {
      number: 3,
      title: 'Подключите адаптер',
      description: 'Вставьте адаптер в диагностический разъем до щелчка',
      image: 'https://cdn.poehali.dev/projects/ac315fd9-9a05-4078-a06c-a765aa011547/files/26f3eb85-7e67-4ad2-a5f4-5182505376b7.jpg',
      details: [
        'Убедитесь, что зажигание включено',
        'Адаптер должен загореться (обычно синим светодиодом)',
        'Не прилагайте чрезмерных усилий при подключении',
        'Контакты должны плотно войти в разъем'
      ]
    },
    {
      number: 4,
      title: 'Подключитесь в приложении',
      description: 'Выберите тип подключения и начните диагностику',
      image: null,
      details: [
        'Bluetooth: включите Bluetooth на телефоне и выберите адаптер',
        'USB: подключите кабель к телефону через OTG-адаптер',
        'WiFi: подключитесь к WiFi-сети адаптера (обычно ELM327)',
        'В приложении нажмите "Выбрать способ подключения"'
      ]
    }
  ];

  const adapters = [
    {
      name: 'ELM327 24V Bluetooth',
      price: '~2500₽',
      pros: ['Беспроводное подключение', 'Широкая совместимость', 'Недорогой'],
      cons: ['Может терять связь', 'Медленнее USB']
    },
    {
      name: 'Actia Multidiag',
      price: '~15000₽',
      pros: ['Профессиональный', 'Полная диагностика', 'Надежный'],
      cons: ['Дорогой', 'Требует ПО']
    },
    {
      name: 'Launch X431',
      price: '~25000₽',
      pros: ['Мультимарочный', 'Обновления ПО', 'Полный функционал'],
      cons: ['Высокая цена', 'Сложность для новичков']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>
          <h1 className="text-xl font-bold">Инструкция по подключению</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
            <Icon name="Cable" size={32} className="text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Как подключиться к отопителю КамАЗа</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Следуйте пошаговой инструкции для правильного подключения диагностического адаптера к 24V системе
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {steps.map((step) => (
            <Card key={step.number} className="bg-slate-900/50 border-slate-800 overflow-hidden">
              <CardHeader className="bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <p className="text-slate-400 text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {step.image && (
                    <div className="order-2 md:order-1">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 object-cover rounded-lg border border-slate-700"
                      />
                    </div>
                  )}
                  <div className={step.image ? 'order-1 md:order-2' : 'col-span-2'}>
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Рекомендуемые адаптеры</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adapters.map((adapter, idx) => (
              <Card key={idx} className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg">{adapter.name}</CardTitle>
                  <p className="text-2xl font-bold text-blue-400">{adapter.price}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                        <Icon name="Plus" size={16} />
                        Преимущества
                      </p>
                      <ul className="space-y-1">
                        {adapter.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2">
                        <Icon name="Minus" size={16} />
                        Недостатки
                      </p>
                      <ul className="space-y-1">
                        {adapter.cons.map((con, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={24} className="text-yellow-500" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Важно!</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Icon name="Zap" size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                    Используйте только адаптеры для 24V систем! Обычные 12V адаптеры могут выйти из строя или работать некорректно
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Shield" size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                    Убедитесь, что адаптер поддерживает протокол вашего отопителя (Webasto или Eberspächer)
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Power" size={16} className="text-yellow-500 mt-1 flex-shrink-0" />
                    При подключении/отключении адаптера двигатель можно не глушить, но зажигание должно быть включено
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="Cable" size={20} className="mr-2" />
            Начать подключение
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ConnectionGuide;
