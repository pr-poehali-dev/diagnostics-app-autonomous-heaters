import * as React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DashboardHeaderProps {
  heaterBrand: 'webasto' | 'eberspacher';
  setHeaterBrand: (brand: 'webasto' | 'eberspacher') => void;
  isConnected: boolean;
  handleConnect: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  heaterBrand,
  setHeaterBrand,
  isConnected,
  handleConnect,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Icon name="Wrench" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HeaterDiag Pro</h1>
              <p className="text-sm text-slate-400">Диагностика автономных отопителей</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={heaterBrand === 'webasto' ? 'default' : 'outline'}
                onClick={() => setHeaterBrand('webasto')}
                className="text-sm"
              >
                Webasto
              </Button>
              <Button
                variant={heaterBrand === 'eberspacher' ? 'default' : 'outline'}
                onClick={() => setHeaterBrand('eberspacher')}
                className="text-sm"
              >
                Eberspächer
              </Button>
            </div>
            
            <Button
              onClick={handleConnect}
              className={`${isConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} transition-all`}
            >
              <Icon name={isConnected ? 'Unplug' : 'Cable'} size={18} className="mr-2" />
              {isConnected ? 'Отключить' : 'Подключить'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
