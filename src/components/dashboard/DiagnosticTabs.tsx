import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DiagnosticTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScanning: boolean;
  handleScan: () => void;
  temperature: number;
  voltage: number;
  fuelPressure: number;
  temperatureData: Array<{ time: string; temp: number }>;
  voltageData: Array<{ time: string; voltage: number }>;
  errorCodes: Array<{ code: string; description: string; severity: string; timestamp: string }>;
  parameters: Array<{ name: string; value: string; status: string; icon: string }>;
  getSeverityColor: (severity: string) => string;
  getSeverityText: (severity: string) => string;
  heaterBrand: 'webasto' | 'eberspacher';
  connectionType: 'bluetooth' | 'usb' | 'wifi' | null;
}

const DiagnosticTabs: React.FC<DiagnosticTabsProps> = ({
  activeTab,
  setActiveTab,
  isScanning,
  handleScan,
  temperature,
  voltage,
  fuelPressure,
  temperatureData,
  voltageData,
  errorCodes,
  parameters,
  getSeverityColor,
  getSeverityText,
  heaterBrand,
  connectionType,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-7 bg-slate-900/50 mb-6">
        <TabsTrigger value="diagnostic" className="flex items-center gap-2">
          <Icon name="Search" size={16} />
          <span className="hidden sm:inline">Диагностика</span>
        </TabsTrigger>
        <TabsTrigger value="monitoring" className="flex items-center gap-2">
          <Icon name="Activity" size={16} />
          <span className="hidden sm:inline">Мониторинг</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <Icon name="History" size={16} />
          <span className="hidden sm:inline">История</span>
        </TabsTrigger>
        <TabsTrigger value="parameters" className="flex items-center gap-2">
          <Icon name="Settings" size={16} />
          <span className="hidden sm:inline">Параметры</span>
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex items-center gap-2">
          <Icon name="FileText" size={16} />
          <span className="hidden sm:inline">Отчеты</span>
        </TabsTrigger>
        <TabsTrigger value="connection" className="flex items-center gap-2">
          <Icon name="Wifi" size={16} />
          <span className="hidden sm:inline">Связь</span>
        </TabsTrigger>
        <TabsTrigger value="help" className="flex items-center gap-2">
          <Icon name="HelpCircle" size={16} />
          <span className="hidden sm:inline">Справка</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="diagnostic" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Статус системы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={24} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">ОК</p>
                    <p className="text-sm text-slate-400">Работает</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Ошибок найдено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={24} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-slate-400">Требуют внимания</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Время работы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1247</p>
                    <p className="text-sm text-slate-400">часов</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Search" size={20} />
                Автоматическое сканирование
              </CardTitle>
              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isScanning ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Сканирование...
                  </>
                ) : (
                  <>
                    <Icon name="Play" size={18} className="mr-2" />
                    Начать сканирование
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isScanning && (
              <div className="mb-4">
                <Progress value={66} className="h-2" />
                <p className="text-sm text-slate-400 mt-2">Проверка системы зажигания...</p>
              </div>
            )}
            
            <div className="space-y-3">
              {errorCodes.map((error, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                  <Badge className={`${getSeverityColor(error.severity)} text-white px-3 py-1`}>
                    {error.code}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-medium">{error.description}</p>
                    <p className="text-sm text-slate-400">Время: {error.timestamp}</p>
                  </div>
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    {getSeverityText(error.severity)}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Icon name="ChevronRight" size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monitoring" className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Thermometer" size={20} />
                Температура охлаждающей жидкости
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-4xl font-bold text-blue-400">{temperature.toFixed(1)}°C</p>
                <p className="text-sm text-slate-400">Норма: 20-85°C</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={temperatureData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTemp)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Zap" size={20} />
                Напряжение бортовой сети
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-4xl font-bold text-purple-400">{voltage.toFixed(2)}V</p>
                <p className="text-sm text-slate-400">Норма: 12.0-14.5V</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={voltageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={[11, 15]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Line type="monotone" dataKey="voltage" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Gauge" size={20} />
              Текущие параметры системы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {parameters.map((param, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Icon name={param.icon as any} size={20} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-400">{param.name}</p>
                      <p className="text-xl font-bold">{param.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="animate-fade-in">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={20} />
              История событий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...errorCodes, ...errorCodes].map((event, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{event.description}</p>
                      <Badge className={`${getSeverityColor(event.severity)}`}>
                        {event.code}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{new Date().toLocaleDateString()} {event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="parameters" className="animate-fade-in">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Settings" size={20} />
              Настройки параметров отопителя
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parameters.slice(0, 4).map((param, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Icon name={param.icon as any} size={20} className="text-blue-400" />
                      <p className="font-medium">{param.name}</p>
                    </div>
                    <Badge variant="outline">{param.value}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Настроить
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports" className="animate-fade-in">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="FileText" size={20} />
              Генерация отчетов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-32 flex flex-col gap-2 bg-slate-800/50 hover:bg-slate-700/50">
                <Icon name="FileText" size={32} />
                <span>Отчет по ошибкам</span>
              </Button>
              <Button className="h-32 flex flex-col gap-2 bg-slate-800/50 hover:bg-slate-700/50">
                <Icon name="BarChart" size={32} />
                <span>Статистика работы</span>
              </Button>
              <Button className="h-32 flex flex-col gap-2 bg-slate-800/50 hover:bg-slate-700/50">
                <Icon name="Download" size={32} />
                <span>Экспорт данных</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="connection" className="animate-fade-in">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Wifi" size={20} />
              Управление подключением
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    {connectionType === 'bluetooth' && <Icon name="Bluetooth" size={24} className="text-green-400" />}
                    {connectionType === 'usb' && <Icon name="Usb" size={24} className="text-green-400" />}
                    {connectionType === 'wifi' && <Icon name="Wifi" size={24} className="text-green-400" />}
                  </div>
                  <div>
                    <p className="font-medium">
                      {connectionType === 'bluetooth' && 'Bluetooth подключен'}
                      {connectionType === 'usb' && 'USB OTG подключен'}
                      {connectionType === 'wifi' && 'WiFi подключен'}
                    </p>
                    <p className="text-sm text-slate-400">Устройство: {heaterBrand === 'webasto' ? 'Webasto ThermoTop Evo' : 'Eberspächer Airtronic D2'}</p>
                  </div>
                </div>
                <Badge className="bg-green-500">Активно</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                  <Icon name="Signal" size={20} className="text-blue-400 mb-2" />
                  <p className="text-sm text-slate-400">Качество сигнала</p>
                  <p className="text-2xl font-bold">Отлично</p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                  <Icon name="Zap" size={20} className="text-purple-400 mb-2" />
                  <p className="text-sm text-slate-400">Скорость передачи</p>
                  <p className="text-2xl font-bold">115200 бод</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="help" className="animate-fade-in">
        <div className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} />
                Совместимые адаптеры
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Bluetooth" size={24} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Bluetooth адаптеры</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">ELM327 Bluetooth v2.1</p>
                            <p className="text-slate-400">Поддержка: Webasto, Eberspächer | Цена: ~1500₽</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Vgate iCar Pro Bluetooth 4.0</p>
                            <p className="text-slate-400">Профессиональный | Цена: ~2800₽</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Usb" size={24} className="text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">USB OTG адаптеры</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">K+DCAN USB кабель</p>
                            <p className="text-slate-400">Прямое подключение | Цена: ~800₽</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">VAG-COM USB адаптер</p>
                            <p className="text-slate-400">Стабильное соединение | Цена: ~1200₽</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="AlertCircle" size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Требуется OTG-переходник</p>
                            <p className="text-slate-400">USB Type-C/Micro → USB-A | Цена: ~200₽</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Wifi" size={24} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">WiFi адаптеры</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">ELM327 WiFi</p>
                            <p className="text-slate-400">Беспроводной, до 15м | Цена: ~1800₽</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">OBDLink MX WiFi</p>
                            <p className="text-slate-400">Премиум качество | Цена: ~4500₽</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Info" size={18} className="text-blue-400" />
                  Советы по выбору адаптера
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-400">
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <p>Проверяйте совместимость с вашей моделью отопителя</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <p>USB адаптеры надёжнее для длительной диагностики</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <p>WiFi удобнее для работы в салоне автомобиля</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <p>Покупайте в проверенных магазинах (остерегайтесь подделок)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="HelpCircle" size={20} />
                Справочная информация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="BookOpen" size={18} className="text-blue-400" />
                    Руководство пользователя
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Подробная инструкция по работе с приложением и расшифровка кодов ошибок
                  </p>
                  <Button variant="outline" size="sm">
                    Открыть руководство
                  </Button>
                </div>

                <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Phone" size={18} className="text-green-400" />
                    Техническая поддержка
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Свяжитесь с нами для получения помощи по диагностике
                  </p>
                  <Button variant="outline" size="sm">
                    Связаться
                  </Button>
                </div>

                <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Info" size={18} className="text-purple-400" />
                    О приложении
                  </h3>
                  <p className="text-sm text-slate-400">
                    HeaterDiag Pro v2.1.4
                    <br />
                    Совместимо: Webasto ThermoTop / Air Top, Eberspächer Airtronic / Hydronic
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DiagnosticTabs;
