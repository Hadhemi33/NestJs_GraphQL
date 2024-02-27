import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserSettingsInput } from '../utils/CreateUserSettingsInput';
import { UserSetting } from '../models/UserSettings';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';
import { UserSettingsService } from 'src/users/UserSettingsService';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingsService) {}
  @Mutation((returns) => UserSetting)
  async createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    const userSetting = await this.userSettingsService.createUserSettings(
      createUserSettingsData,
    );
    return userSetting;
  }
}
