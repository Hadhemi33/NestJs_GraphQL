import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
export let incrementalId = 3;
import { User } from '../graphql/models/User';
import { mockUsers } from 'src/__mocks__/mockUsers';
import { UserSetting } from '../graphql/models/UserSettings';
import { of } from 'rxjs';
import { mockUserSettings } from 'src/__mocks__/mockUserSettings';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { Inject } from '@nestjs/common';
import { UserService } from './UserService';
import { UserSettingsService } from './UserSettingsService';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingsService: UserSettingsService,
  ) {}
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }
  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }
  // @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   console.log(user);
  //   return this.userSettingsService.getUserSettingsById(user.id);
  // }
  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
