import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface ConnectionDialogProps {
  handleConnectionSelect: (type: 'bluetooth' | 'usb' | 'wifi') => void;
  setShowConnectionDialog: (show: boolean) => void;
}

const ConnectionDialog: React.FC<ConnectionDialogProps> = ({
  handleConnectionSelect,
  setShowConnectionDialog,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="bg-slate-900/50 border-slate-800 max-w-4xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Icon name="Cable" size={28} />
              Выберите способ подключения
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/guide')}
              className="flex items-center gap-2"
            >
              <Icon name="BookOpen" size={16} />
              Подробная инструкция
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleConnectionSelect('bluetooth')}
              className="p-6 bg-slate-800/50 rounded-lg border-2 border-slate-700 hover:border-blue-500 transition-all text-left group"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Icon name="Bluetooth" size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bluetooth</h3>
              <p className="text-sm text-slate-400 mb-4">Беспроводное подключение через Bluetooth адаптер</p>
              <div className="space-y-1 text-sm text-slate-500">
                <p>✓ Дальность до 10м</p>
                <p>✓ Простая настройка</p>
                <p>✓ Мобильность</p>
              </div>
            </button>

            <button
              onClick={() => handleConnectionSelect('usb')}
              className="p-6 bg-slate-800/50 rounded-lg border-2 border-slate-700 hover:border-purple-500 transition-all text-left group"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Icon name="Usb" size={32} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">USB OTG</h3>
              <p className="text-sm text-slate-400 mb-4">Прямое подключение через USB кабель</p>
              <div className="space-y-1 text-sm text-slate-500">
                <p>✓ Максимальная скорость</p>
                <p>✓ Стабильное соединение</p>
                <p>✓ Не требует батарею</p>
              </div>
            </button>

            <button
              onClick={() => handleConnectionSelect('wifi')}
              className="p-6 bg-slate-800/50 rounded-lg border-2 border-slate-700 hover:border-green-500 transition-all text-left group"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                <Icon name="Wifi" size={32} className="text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WiFi</h3>
              <p className="text-sm text-slate-400 mb-4">Подключение через WiFi адаптер</p>
              <div className="space-y-1 text-sm text-slate-500">
                <p>✓ Дальность до 15м</p>
                <p>✓ Высокая скорость</p>
                <p>✓ Удобство работы</p>
              </div>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Info" size={18} className="text-blue-400" />
              Инструкции по подключению
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-slate-800/30 rounded-lg">
                <p className="font-medium text-blue-400 mb-1">Bluetooth</p>
                <p className="text-slate-400 text-xs">1. Включите Bluetooth на телефоне<br/>2. Включите адаптер<br/>3. Выберите устройство в списке</p>
              </div>
              <div className="p-3 bg-slate-800/30 rounded-lg">
                <p className="font-medium text-purple-400 mb-1">USB OTG</p>
                <p className="text-slate-400 text-xs">1. Подключите OTG-кабель<br/>2. Подключите адаптер к кабелю<br/>3. Разрешите доступ к USB</p>
              </div>
              <div className="p-3 bg-slate-800/30 rounded-lg">
                <p className="font-medium text-green-400 mb-1">WiFi</p>
                <p className="text-slate-400 text-xs">1. Включите WiFi адаптер<br/>2. Подключитесь к сети адаптера<br/>3. Введите пароль (по умолчанию 12345678)</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => setShowConnectionDialog(false)} variant="outline">
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectionDialog;