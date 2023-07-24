'use client'
import { useState } from 'react'

import { WEEK_DATA } from '@/common/constants/week_data'
import {
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@/common/design'

export default function MonthScreen() {
  const [today] = useState(new Date())
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay()

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1)
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1)
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <Flex flexDirection='column'>
      <Flex flexDirection='row' justifyContent='space-between' paddingY='15px'>
        <Button onClick={prevMonth}>&lt;</Button>
        <Heading size='md'>
          {year}年 {month}月
        </Heading>
        <Button onClick={nextMonth}>&gt;</Button>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            {WEEK_DATA.map((week) => (
              <Th
                key={week.id}
                textAlign='center'
                fontSize='18px'
                color={
                  week.label_en == 'sun'
                    ? 'white'
                    : '' || week.label_en == 'sat'
                    ? 'white'
                    : ''
                }
                bg={
                  week.label_en == 'sun'
                    ? 'red.500'
                    : '' || week.label_en == 'sat'
                    ? 'blue.500'
                    : ''
                }
              >
                {week.label_ja}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(Math.ceil((daysInMonth + firstDayOfMonth) / 7))].map(
            (_, weekIndex) => (
              <Tr key={weekIndex}>
                {[...Array(7)].map((_, dayIndex) => {
                  const day = weekIndex * 7 + dayIndex + 1 - firstDayOfMonth
                  const isCurrentMonth = day > 0 && day <= daysInMonth

                  return (
                    <Td
                      height='80px'
                      key={dayIndex}
                      textAlign='center'
                      className={!isCurrentMonth ? 'other-month' : ''}
                      bg={
                        dayIndex == 0
                          ? 'red.100'
                          : '' || dayIndex == 6
                          ? 'blue.100'
                          : '' ||
                            (today.getFullYear() === year &&
                              today.getMonth() + 1 === month &&
                              today.getDate() === day)
                          ? 'green.100'
                          : ''
                      }
                    >
                      <Text>{isCurrentMonth ? day : ''}</Text>
                      <Flex
                        height='100%'
                        flexDirection='column'
                        justifyContent='center'
                        alignContent='start'
                        cursor='pointer'
                      ></Flex>
                    </Td>
                  )
                })}
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Flex>
  )
}
