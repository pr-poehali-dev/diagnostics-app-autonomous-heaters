import * as React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ConnectionDialog from '@/components/dashboard/ConnectionDialog';
import DiagnosticTabs from '@/components/dashboard/DiagnosticTabs';

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState('diagnostic');
  const [isConnected, setIsConnected] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(false);
  const [heaterBrand, setHeaterBrand] = React.useState<'webasto' | 'eberspacher'>('webasto');
  const [temperature, setTemperature] = React.useState(22);
  const [voltage, setVoltage] = React.useState(24.8);
  const [fuelPressure, setFuelPressure] = React.useState(1.2);
  const [connectionType, setConnectionType] = React.useState<'bluetooth' | 'usb' | 'wifi' | null>(null);
  const [showConnectionDialog, setShowConnectionDialog] = React.useState(false);

  const [temperatureData, setTemperatureData] = React.useState([
    { time: '10:00', temp: 18 },
    { time: '10:05', temp: 20 },
    { time: '10:10', temp: 22 },
    { time: '10:15', temp: 24 },
    { time: '10:20', temp: 26 },
    { time: '10:25', temp: 28 },
  ]);

  const [voltageData, setVoltageData] = React.useState([
    { time: '10:00', voltage: 24.4 },
    { time: '10:05', voltage: 24.6 },
    { time: '10:10', voltage: 24.8 },
    { time: '10:15', voltage: 25.0 },
    { time: '10:20', voltage: 24.8 },
    { time: '10:25', voltage: 24.6 },
  ]);

  const errorCodes = [
    { code: 'E001', description: 'Ошибка датчика температуры', severity: 'high', timestamp: '10:15:32' },
    { code: 'W002', description: 'Низкое напряжение батареи', severity: 'medium', timestamp: '09:45:12' },
    { code: 'I003', description: 'Плановое техобслуживание через 100ч', severity: 'low', timestamp: '08:30:00' },
  ];

  const parameters = [
    { name: 'Температура охл. жидкости', value: `${temperature}°C`, status: 'normal', icon: 'Thermometer' },
    { name: 'Напряжение бортсети', value: `${voltage}V`, status: 'normal', icon: 'Zap' },
    { name: 'Давление топлива', value: `${fuelPressure} bar`, status: 'normal', icon: 'Gauge' },
    { name: 'Скорость вентилятора', value: '3200 об/мин', status: 'normal', icon: 'Fan' },
    { name: 'Расход топлива', value: '0.35 л/ч', status: 'normal', icon: 'Droplet' },
    { name: 'Время работы', value: '1247 ч', status: 'normal', icon: 'Clock' },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        setTemperature(prev => Math.min(85, prev + Math.random() * 2 - 0.5));
        setVoltage(prev => Math.max(22, Math.min(28, prev + Math.random() * 0.4 - 0.2)));
        setFuelPressure(prev => Math.max(0.8, Math.min(1.5, prev + Math.random() * 0.1 - 0.05)));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      setConnectionType(null);
    } else {
      setShowConnectionDialog(true);
    }
  };

  const handleConnectionSelect = (type: 'bluetooth' | 'usb' | 'wifi') => {
    setConnectionType(type);
    setIsConnected(true);
    setShowConnectionDialog(false);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'Критично';
      case 'medium': return 'Предупреждение';
      case 'low': return 'Инфо';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <DashboardHeader
        heaterBrand={heaterBrand}
        setHeaterBrand={setHeaterBrand}
        isConnected={isConnected}
        handleConnect={handleConnect}
      />

      <main className="container mx-auto px-4 py-6">
        {!isConnected && !showConnectionDialog ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Icon name="Cable" size={40} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Устройство не подключено</h2>
            <p className="text-slate-400 mb-6 max-w-md">
              Выберите способ подключения диагностического адаптера к отопителю
            </p>
            <Button onClick={handleConnect} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Cable" size={20} className="mr-2" />
              Выбрать способ подключения
            </Button>
          </div>
        ) : showConnectionDialog ? (
          <ConnectionDialog
            handleConnectionSelect={handleConnectionSelect}
            setShowConnectionDialog={setShowConnectionDialog}
          />
        ) : (
          <DiagnosticTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isScanning={isScanning}
            handleScan={handleScan}
            temperature={temperature}
            voltage={voltage}
            fuelPressure={fuelPressure}
            temperatureData={temperatureData}
            voltageData={voltageData}
            errorCodes={errorCodes}
            parameters={parameters}
            getSeverityColor={getSeverityColor}
            getSeverityText={getSeverityText}
            heaterBrand={heaterBrand}
            connectionType={connectionType}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;