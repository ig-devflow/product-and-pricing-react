import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { DIVISION_MANAGER_ROUTES } from '@/shared/config/routes'
import { useApiErrorMessage } from '@/shared/composables/useApiErrorMessage'
import { useDivisionListQuery } from '@/modules/divisions/queries/useDivisionListQuery'

export const useDivisionListPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const initialSearchTerm = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.get('q') ?? ''
  }, [location.search])
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const searchSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const divisionsQuery = useDivisionListQuery()
  const errorMessage = useApiErrorMessage(divisionsQuery.error, 'Failed to load divisions.')

  useEffect(() => {
    const normalizedValue = searchTerm.trim()
    const params = new URLSearchParams(location.search)
    const currentValue = params.get('q') ?? ''

    if (normalizedValue === currentValue) {
      return
    }

    if (searchSyncTimerRef.current) {
      clearTimeout(searchSyncTimerRef.current)
    }

    searchSyncTimerRef.current = setTimeout(() => {
      const nextParams = new URLSearchParams(location.search)

      if (normalizedValue) {
        nextParams.set('q', normalizedValue)
      } else {
        nextParams.delete('q')
      }

      const nextSearch = nextParams.toString()
      navigate(
        {
          pathname: location.pathname,
          search: nextSearch ? `?${nextSearch}` : '',
        },
        { replace: true },
      )

      searchSyncTimerRef.current = null
    }, 200)

    return () => {
      if (searchSyncTimerRef.current) {
        clearTimeout(searchSyncTimerRef.current)
        searchSyncTimerRef.current = null
      }
    }
  }, [location.pathname, location.search, navigate, searchTerm])

  useEffect(
    () => () => {
      if (searchSyncTimerRef.current) {
        clearTimeout(searchSyncTimerRef.current)
      }
    },
    [],
  )

  const sortedDivisions = useMemo(() => {
    const items = divisionsQuery.data ?? []

    return [...items].sort((left, right) =>
      left.name.localeCompare(right.name, undefined, { sensitivity: 'base' }),
    )
  }, [divisionsQuery.data])

  const filteredDivisions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    if (!term) {
      return sortedDivisions
    }

    return sortedDivisions.filter((division) => {
      const searchable = [
        division.name,
        division.websiteDisplayUrl,
        division.addressText,
        division.createdBy,
        division.lastModifiedBy,
      ]
        .join(' ')
        .toLowerCase()

      return searchable.includes(term)
    })
  }, [searchTerm, sortedDivisions])

  const emptyMessage = useMemo(() => {
    const term = searchTerm.trim()

    if (term) {
      return `No divisions matched "${term}".`
    }

    return 'No divisions found.'
  }, [searchTerm])

  return {
    searchTerm,
    setSearchTerm,
    filteredDivisions,
    filteredCount: filteredDivisions.length,
    totalCount: sortedDivisions.length,
    isLoading: divisionsQuery.isLoading,
    isRefreshing: divisionsQuery.isFetching && !divisionsQuery.isLoading,
    errorMessage,
    emptyMessage,
    refetch: divisionsQuery.refetch,
    openDivision: (divisionId: number) => navigate(DIVISION_MANAGER_ROUTES.details(divisionId)),
    handleCreateClick: () => navigate(DIVISION_MANAGER_ROUTES.create),
  }
}
