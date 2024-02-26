import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserSettingsInput } from '../utils/CreateUserSettingsInput';
import { UserSetting } from '../models/UserSettings';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';

@Resolver()
export class UserSettingsResolver {
  @Mutation((returns) => UserSetting)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    mockUserSettings.push(createUserSettingsData);
    return createUserSettingsData;
  }
}
