#!/bin/bash

LINK=$(less README.md | grep https://github.com/ | grep /middle.messenger.praktikum.yandex)

if [[ -z $LINK ]]
then
	exit 1
fi

exit 0
