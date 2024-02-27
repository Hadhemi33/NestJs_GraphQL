import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSettings';
import { CreateUserSettingsInput } from 'src/graphql/utils/CreateUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  getUserSettingsById(userId: number) {
    return this.userSettingRepository.findOneBy({ userId });
  }
  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSettingsData.userId,
    });
    if (!findUser) throw new Error('User not found');
    const newUserSettings = this.userSettingRepository.create(
      createUserSettingsData,
    );
    const savedSettings =
      await this.userSettingRepository.save(newUserSettings);
    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);
    return savedSettings;
  }
}
