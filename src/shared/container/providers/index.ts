import { container } from 'tsyringe';
import { BcryptHashProvider } from './HashProvider/implementations/BCrptyHashProvider';
import { IHashProvider } from './HashProvider/interface/IHashProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/interface/IStorageProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
